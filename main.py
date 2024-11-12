import cv2
import sys
import numpy as np
import matplotlib.pyplot as plt

def pencil_sketch(image_path):
    # Load the image in grayscale
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # Check if the image is loaded successfully
    if img is None:
        print("Error: Image not found or path is incorrect.")
        return None

    # Invert the grayscale image
    inverted_img = 255 - img

    # Apply Gaussian blur to the inverted image
    blurred_img = cv2.GaussianBlur(inverted_img, (21, 21), 0)

    # Blend the grayscale image with the blurred image using a color dodge blend mode
    pencil_sketch_img = cv2.divide(img, 255 - blurred_img, scale=256)

    return pencil_sketch_img

# Replace 'your_image.jpg' with the actual path to your image
# image_path = 'pic.jpg'
filePath = sys.argv[1]
sketch = pencil_sketch(filePath)

# Display the pencil sketch using matplotlib
if sketch is not None:
    plt.imshow(sketch, cmap='gray')
    plt.axis('off')  # Hide axis
    plt.show()

# Save the pencil sketch (optional)
cv2.imwrite('pencil_sketch.jpg', sketch)
