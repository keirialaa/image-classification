from flask import Flask, render_template, request, jsonify
import io
import os
from PIL import Image
import numpy as np
import tensorflow as tf 

app = Flask(__name__)

# Load the model 
current_dir = os.path.dirname(__file__)
model_path = os.path.join(current_dir, '..', 'models', 'animal_classifier.keras')
model = tf.keras.models.load_model(model_path)

# Render the main page 
@app.route("/")
def home():
    return render_template("index.html")

# Process and classify the image
@app.route("/classify", methods=["POST"])
def classify():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    if file:
        # Open and preprocess the image
        img = Image.open(io.BytesIO(file.read()))
        img = img.convert('RGB')
        img = img.resize((224, 224)) 
        img_array = np.array(img) / 255.0 # Normalize pixel values to [0, 1]
        img_array = np.expand_dims(img_array, axis=0) # Add batch dimension

        # Make a prediction
        predictions = model.predict(img_array)
        
        # Get the result
        class_names = ["butterfly", "cat", "chicken", "cow", "dog", "elephant", "horse", "sheep", "spider", "squirrel"] 
        result_index = np.argmax(predictions[0])
        result_label = class_names[result_index]
        confidence = float(np.max(predictions[0]) * 100)

        return jsonify({
            "prediction": result_label,
            "confidence": f"{confidence:.2f}%"
        })
    return jsonify({"error": "Unknown upload error"}), 500



if __name__ == "__main__":
    app.run(debug=True)