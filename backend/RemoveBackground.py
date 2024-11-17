import cv2
import numpy as np
import requests
import sys
import os

def load_image_from_url(url):
    last_segment = url.split('/')[-1]  # Extract the last part of the URL
    response = requests.get(url)
    if response.status_code == 200:
        image_data = np.asarray(bytearray(response.content), dtype="uint8")
        image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)
        return image, last_segment
    else:
        print("Error: Unable to fetch image from URL")
        sys.exit(1)

# Get the filename argument
filename = sys.argv[1] if len(sys.argv) > 1 else input("Please provide the image filename (either URL or local path): ")

# Check if filename is a URL or local path
if filename.startswith("http"):
    image, last_segment = load_image_from_url(filename)
else:
    image = cv2.imread(filename)
    last_segment = os.path.basename(filename)

# Check if the image was successfully loaded
if image is None:
    print("Error: Could not load image.")
    sys.exit(1)

# Create a mask for GrabCut
mask = np.zeros(image.shape[:2], np.uint8)

# Create background and foreground models
bgd_model = np.zeros((1, 65), np.float64)
fgd_model = np.zeros((1, 65), np.float64)

# Define the rectangle around the foreground (you can modify this based on your image)
rect = (10, 10, image.shape[1] - 20, image.shape[0] - 20)  # (x, y, width, height)

# Apply GrabCut algorithm
cv2.grabCut(image, mask, rect, bgd_model, fgd_model, 5, cv2.GC_INIT_WITH_RECT)

# Modify mask to create a binary mask (foreground vs background)
mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')

# Extract the foreground using the mask
foreground = image * mask2[:, :, np.newaxis]

# Ensure the "RemoveBackground_image" directory exists
output_dir = "RemoveBackground_image"
os.makedirs(output_dir, exist_ok=True)

# Use the last segment name for output
output_path = os.path.join(output_dir, f"RemoveBackground_{last_segment}")
cv2.imwrite(output_path, foreground)
print(f"Background removed image saved as '{output_path}'")
