from flask import Flask, render_template, request, redirect, url_for
import utils  # Your utility functions
import pandas as pd

app = Flask(__name__)

# Load data 
df = pd.read_csv("movies.csv")

@app.route("/")
def home():
    # Redirect to Streamlit app
    return redirect("http://localhost:8501")  # Streamlit runs on port 8501 by default

 # Import the function

@app.route("/details/<int:movie_id>")
def movie_details(movie_id):
    movie = df[df["id"] == movie_id].iloc[0]

    # Fetch cast details
    cast = utils.get_cast(movie_id)

    recommendations_df = utils.recommend_movies(movie["title"])

    # Convert the DataFrame to a list of dictionaries
    recommendations = recommendations_df.to_dict(orient="records")
    
    return render_template(
        "details.html",
        movie={
            "id":movie['id'],
            "title": movie["title"],
            "poster": utils.get_poster(movie_id),
            "backdrop": utils.get_backdrop(movie_id),
            "genre": movie["genres"],
            "release_date": movie["release_date"],
            "runtime": movie["runtime"],
            "overview": movie["overview"],
        },
        cast=cast,  # Add cast data to the template
        recommendations = recommendations,
    )


if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Flask runs on port 5000
