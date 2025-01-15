from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load

app = Flask(__name__)
CORS(app)



model_path = "tfidf_naive_bayes_model.pkl"
vectorizer_path = "tfidf_vectorizer.pkl"

try:
    model = load(model_path)  
    vectorizer = load(vectorizer_path)
    print("Model and vectorizer loaded successfully.")
except Exception as e:
    print(f"Error loading model or vectorizer: {e}")
    raise


@app.route("/analyse", methods=["POST"])
def analyse_input():
    try:
        data = request.get_json()
        print("Received data:", data)

        input_text = data.get("input", "")
        if not input_text:
            return jsonify({"error": "No input provided"}), 400

        input_vector = vectorizer.transform([input_text])  
        print("Transformed input vector:", input_vector)

        sentiment = model.predict(input_vector)[0]  
        print("Predicted sentiment:", sentiment)

        return jsonify({"result": str(sentiment)}) 
    except Exception as e:
        print("Error during prediction:", str(e))
        return jsonify({"error": f"Error during prediction: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
