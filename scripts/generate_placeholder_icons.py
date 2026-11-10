import os
from PIL import Image, ImageDraw, ImageFilter

out_dir = r"public/3dModels/icons"
os.makedirs(out_dir, exist_ok=True)

def create_glass_sphere_icon(filename, primary_color, secondary_color, icon_type):
    size = (256, 256)
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Ambient glow
    glow = Image.new("RGBA", size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([38, 38, 218, 218], fill=(*primary_color, 80))
    glow = glow.filter(ImageFilter.GaussianBlur(24))
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)

    # 3D Glass orb body
    bbox = [48, 48, 208, 208]
    draw.ellipse(bbox, fill=(*secondary_color, 140), outline=(255, 255, 255, 180), width=3)

    # Glass highlight (reflection crescent)
    hl = Image.new("RGBA", size, (0, 0, 0, 0))
    hl_draw = ImageDraw.Draw(hl)
    hl_draw.ellipse([70, 56, 170, 110], fill=(255, 255, 255, 120))
    hl = hl.filter(ImageFilter.GaussianBlur(8))
    img = Image.alpha_composite(img, hl)
    draw = ImageDraw.Draw(img)

    # Inner icon drawing based on icon_type
    cx, cy = 128, 128
    if icon_type == "cloud": # Emission / Cloud
        draw.ellipse([90, 120, 140, 160], fill=(255, 255, 255, 230))
        draw.ellipse([120, 105, 175, 155], fill=(255, 255, 255, 240))
        draw.ellipse([100, 95, 145, 140], fill=(255, 255, 255, 245))
        draw.rounded_rectangle([92, 130, 172, 160], radius=12, fill=(255, 255, 255, 235))
    elif icon_type == "bottle": # Recycled Glass / Bottle
        draw.rounded_rectangle([118, 90, 138, 105], radius=2, fill=(255, 255, 255, 240))
        draw.rounded_rectangle([112, 106, 144, 170], radius=10, fill=(255, 255, 255, 230))
        draw.line([128, 120, 128, 155], fill=(*primary_color, 255), width=4)
    elif icon_type == "coin": # Reward Points / Star / Coin
        draw.ellipse([100, 100, 156, 156], fill=(255, 230, 100, 240), outline=(255, 255, 255, 240), width=3)
        draw.polygon([(128, 108), (133, 122), (148, 123), (136, 133), (140, 148), (128, 139), (116, 148), (120, 133), (108, 123), (123, 122)], fill=(255, 255, 255, 250))
    elif icon_type == "sprout": # Tree / Sprout
        draw.arc([115, 120, 145, 170], start=90, end=270, fill=(255, 255, 255, 240), width=5)
        draw.chord([128, 105, 155, 135], start=180, end=360, fill=(255, 255, 255, 240))
        draw.chord([101, 115, 128, 145], start=0, end=180, fill=(255, 255, 255, 240))
        draw.line([128, 110, 128, 168], fill=(255, 255, 255, 250), width=5)

    img.save(os.path.join(out_dir, filename), "PNG")
    print(f"Generated {filename}")

create_glass_sphere_icon("emission-cloud-3d.png", (34, 197, 94), (16, 185, 129), "cloud")
create_glass_sphere_icon("recycled-glass-3d.png", (20, 184, 166), (13, 148, 136), "bottle")
create_glass_sphere_icon("reward-points-3d.png", (234, 179, 8), (202, 138, 4), "coin")
create_glass_sphere_icon("tree-sprout-3d.png", (74, 222, 128), (22, 163, 74), "sprout")

