import { Vector2, distance, CONSTANTS } from "@aetheria/common";

export interface GridEntity {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  flags: number;
  cellKey: string;
  lastUpdate: number;
}

export class SpatialGrid {
  private cellSize: number;
  private cells: Map<string, Set<string>> = new Map();
  private entities: Map<string, GridEntity> = new Map();

  constructor(cellSize: number = CONSTANTS.GRID_CELL_SIZE) {
    this.cellSize = cellSize;
  }

  public getCellCoord(val: number): number {
    return Math.floor(val / this.cellSize);
  }

  public getCellKey(cx: number, cy: number): string {
    return `${cx}:${cy}`;
  }

  public updateEntity(entity: GridEntity): void {
    const cx = this.getCellCoord(entity.x);
    const cy = this.getCellCoord(entity.y);
    const newKey = this.getCellKey(cx, cy);

    const oldEntity = this.entities.get(entity.id);
    if (oldEntity && oldEntity.cellKey !== newKey) {
      const oldCell = this.cells.get(oldEntity.cellKey);
      if (oldCell) {
        oldCell.delete(entity.id);
        if (oldCell.size === 0) this.cells.delete(oldEntity.cellKey);
      }
    }

    if (!this.cells.has(newKey)) {
      this.cells.set(newKey, new Set());
    }
    this.cells.get(newKey)!.add(entity.id);

    entity.cellKey = newKey;
    this.entities.set(entity.id, entity);
  }

  public removeEntity(id: string): void {
    const entity = this.entities.get(id);
    if (!entity) return;

    const cell = this.cells.get(entity.cellKey);
    if (cell) {
      cell.delete(id);
      if (cell.size === 0) this.cells.delete(entity.cellKey);
    }
    this.entities.delete(id);
  }

  public getEntity(id: string): GridEntity | undefined {
    return this.entities.get(id);
  }

  public getAllEntities(): GridEntity[] {
    return Array.from(this.entities.values());
  }

  /**
   * Returns all entities in the 3x3 Moore neighborhood (current cell + 8 adjacent cells = 180x180 WU)
   */
  public getMooreNeighborhoodEntities(x: number, y: number): GridEntity[] {
    const cx = this.getCellCoord(x);
    const cy = this.getCellCoord(y);
    const neighbors: GridEntity[] = [];

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const key = this.getCellKey(cx + dx, cy + dy);
        const cell = this.cells.get(key);
        if (cell) {
          for (const id of cell) {
            const entity = this.entities.get(id);
            if (entity) neighbors.push(entity);
          }
        }
      }
    }
    return neighbors;
  }

  /**
   * Calculates spatial dispersion metric for entropy scoring: normalized standard deviation
   */
  public calculateSpatialDispersion(): number {
    const all = this.getAllEntities();
    if (all.length < 2) return 0.5;

    let sumX = 0, sumY = 0;
    for (const e of all) {
      sumX += e.x;
      sumY += e.y;
    }
    const meanX = sumX / all.length;
    const meanY = sumY / all.length;

    let varSum = 0;
    for (const e of all) {
      const dx = e.x - meanX;
      const dy = e.y - meanY;
      varSum += dx * dx + dy * dy;
    }
    const variance = varSum / all.length;
    const stdDev = Math.sqrt(variance);

    // Normalize against reference radius 120 WU
    return Math.min(1.0, stdDev / 120.0);
  }
}
