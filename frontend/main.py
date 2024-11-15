import cv2
import numpy as np
import requests
import sys
import os

def load_image_from_url(url):
    response = requests.get(url)
    if response.status_code == 200:
        image_data = np.asarray(bytearray(response.content), dtype="uint8")
        image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)
        return image
    else:
        print("Error: Unable to fetch image from URL")
        sys.exit(1)

# Get the filename argument
filename = sys.argv[1]

# Check if filename is a URL
if filename.startswith("http"):
    image = load_image_from_url(filename)
else:
    image = cv2.imread(filename)

# Check if image was successfully loaded
if image is None:
    print("Error: Could not load image.")
    sys.exit(1)

# Convert the image to a pencil sketch
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
inverted_image = cv2.bitwise_not(gray_image)
blurred = cv2.GaussianBlur(inverted_image, (21, 21), 0)
inverted_blurred = cv2.bitwise_not(blurred)
sketch = cv2.divide(gray_image, inverted_blurred, scale=256.0)

# Ensure the "sketched_pic" directory exists
output_dir = "sketched_pic"
os.makedirs(output_dir, exist_ok=True)

# Save the pencil sketch in the "sketched_pic" folder
output_path = os.path.join(output_dir, 'pencil_sketch.jpg')
cv2.imwrite(output_path, sketch)
print(f"Pencil sketch saved as '{output_path}'")
