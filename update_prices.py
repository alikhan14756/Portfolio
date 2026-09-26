with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

replacements = [
    # Base Projects
    ('data-base-min="300" data-base-max="600"', 'data-base-min="80" data-base-max="150"'),
    ('data-base-min="150" data-base-max="250"', 'data-base-min="40" data-base-max="80"'),
    ('data-base-min="500" data-base-max="1000"', 'data-base-min="150" data-base-max="300"'),
    ('data-base-min="200" data-base-max="400"', 'data-base-min="50" data-base-max="100"'),
    
    # Add-ons
    ('data-add-min="150" data-add-max="300"', 'data-add-min="40" data-add-max="80"'),
    ('data-add-min="50" data-add-max="80"', 'data-add-min="20" data-add-max="40"'),
    ('data-add-min="100" data-add-max="200"', 'data-add-min="30" data-add-max="60"'),
    ('data-add-min="75" data-add-max="150"', 'data-add-min="20" data-add-max="40"'),
]

for old_str, new_str in replacements:
    html = html.replace(old_str, new_str)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Updated prices in HTML")
