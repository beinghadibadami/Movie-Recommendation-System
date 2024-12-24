import streamlit as st
from utils import recommend_movies, get_poster
import pandas as pd

# Load data
df = pd.read_csv("C:/Users/moham/OneDrive/Desktop/Data Science Project/Movie Recommendation System/app/movies.csv")

st.title("Movie Recommendation System")

# Movie selection
title = st.selectbox("Select a movie to get recommendations", df["title"])
predict = st.button("Recommend")

if predict:
    recommendations = recommend_movies(title)
    st.write(f"Recommendations for: {title}")
    cols = st.columns(5)  # 5 movies per row

    for i, col in enumerate(cols):
        if i < len(recommendations):
            with col:
                st.image(
                    recommendations.iloc[i]["poster_path"], 
                    use_column_width=True
                )  # Poster
                st.caption(recommendations.iloc[i]["title"])  # Title
                # Button redirects to Flask details page
                movie_id = recommendations.iloc[i]["id"]
                st.markdown(f"[View Details](http://localhost:5000/details/{movie_id})",unsafe_allow_html=True,)

#  