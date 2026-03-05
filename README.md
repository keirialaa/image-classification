# 🐾 Animal Classifier: 10-Class CNN with Flask App

A deep learning image classification system that identifies 10 different animals. Built using TensorFlow/Keras and deployed as a local Flask web application.

## 🚀 Overview
- **Objective:** Classify images into 10 categories: Butterfly, Cat, Chicken, Cow, Dog, Elephant, Horse, Sheep, Spider, and Squirrel.
- **Accuracy:** ~82% on validation data.
- **Tech Stack:** Python, TensorFlow/Keras, Flask, NumPy, Matplotlib.

## 🧠 Model Architecture
The model is a custom 5-block Convolutional Neural Network (CNN) featuring:
* **In-Model Data Augmentation:** Random flips, rotations, and zooms to improve generalization.
* **Batch Normalization:** Applied after each convolution for faster and more stable training.
* **Global Average Pooling:** Used instead of Flatten to reduce parameter count and combat overfitting.
* **Optimizer:** Adam with a dynamic learning rate reduction on plateaus.

## 📊 Performance
The model achieved a balanced weighted average F1-score of 0.82.
* **Best Classes:** Spiders (0.90 F1) and Chickens (0.89 F1).
* **Key Insight:** High precision for dogs (0.94) shows the model is highly reliable when it identifies a dog, though it occasionally misses more subtle dog features (recall 0.63).<img width="1004" height="801" alt="Screenshot 2026-03-05 at 19 14 43" src="https://github.com/user-attachments/assets/aa3b1ad9-ea4c-4675-a72e-a8512d246f9e" />

## 📂 Project Structure
- models/: Contains the saved .keras model file.
- notebooks/: Jupyter Notebook used for training and evaluation.
- web_app/static/: CSS and uploaded images for the web app.
- web_app/templates/: HTML files for the Flask interface.
- web_app/app.py: the Flask application.

<img width="1004" height="801" alt="Screenshot 2026-03-05 at 19 14 43" src="https://github.com/user-attachments/assets/0aef3c43-b3d0-4e4a-b69c-a2b27477b142" />
