import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Sample data (you would have more entries in practice)
data = [
    {"question": "1. What is the capital of France?", "options": "A) London\nB) Berlin\nC) Paris\nD) Madrid", "format": "numbered_letters"},
    {"question": "3. Who wrote 'Romeo and Juliet'?", "options": "1) Charles Dickens\n2) William Shakespeare\n3) Jane Austen\n4) Mark Twain", "format": "numbered_numbers"},
    {"question": "What is the chemical symbol for gold?", "options": "a) Au\nb) Ag\nc) Fe\nd) Cu", "format": "unnumbered_letters"},
    {"question": "The Great Wall of China is visible from space.", "options": "True\nFalse", "format": "true_false"}
]

df = pd.DataFrame(data)

# 2. Extract features
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df['question'] + ' ' + df['options'])
y = df['format']

# 3. Choose a model (we'll use Random Forest as an example)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
clf = RandomForestClassifier(n_estimators=100, random_state=42)

# 4. Train the model
clf.fit(X_train, y_train)

# 5. Evaluate
y_pred = clf.predict(X_test)
print(classification_report(y_test, y_pred))

# Function to predict format of new MCQs
def predict_mcq_format(question, options):
    new_data = vectorizer.transform([question + ' ' + options])
    return clf.predict(new_data)[0]

# Example usage
new_question = "What is the largest planet in our solar system?"
new_options = "A) Earth\nB) Mars\nC) Jupiter\nD) Saturn"
predicted_format = predict_mcq_format(new_question, new_options)
print(f"Predicted format: {predicted_format}")
