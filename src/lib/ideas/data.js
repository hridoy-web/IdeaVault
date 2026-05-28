// fetch all ideas
export const fetchIdeas = async (search = '', category = 'All') => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/ideas?search=${search}&category=${category}`;

        // console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
        // console.log("FULL URL:", url);
        const res = await fetch(url);
        // console.log("response:", res.status);
        if (!res.ok) {
            throw new Error("Failed to fetch");
        }
        const data = await res.json();
        // console.log("fetch data:", data);
        return data;

    } catch (error) {
        console.error("fetch error:", error);
        return [];
    }
}


// fetch trending ideas
export const fetchTrendingIdeas = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trending-ideas`);
    const data = await res.json();
    return data || [];
}

// create ideas
export const createIdea = async (ideaData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-ideas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ideaData),
    });
    const data = await res.json();
    return data;
}

// fetch my ideas
export const fetchMyIdeas = async (email) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-ideas?email=${email}`
    );
    return await res.json();
};

//update idea
export const updateIdea = async (id, updatedData) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/update-idea/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        }
    );
    return res.json();
};

// delete idea
export const deleteIdea = async (id) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/delete-idea/${id}`,
        {
            method: "DELETE",
        }
    );
    return await res.json();
};

// fetch comments
export const fetchComments = async (ideaId) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${ideaId}`
    );
    return await res.json();
};


// add comment
export const addComment = async (commentData) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(commentData)
        }
    );
    return await res.json();
};


// update comment
export const updateComment = async (id, text) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`,
        {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ text })
        }
    );
    return await res.json();
};


// delete comment
export const deleteComment = async (id) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`,
        {
            method: "DELETE"
        }
    );
    return await res.json();
};

// my interactions api
export const fetchMyInteractions = async (email) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-interactions?email=${email}`
    );
    return await res.json();
};