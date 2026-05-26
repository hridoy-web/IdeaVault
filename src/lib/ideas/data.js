
export const fetchIdeas = async (search = '', category = 'All') => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/ideas?search=${search}`;

    if (category !== 'All') {
        url = url + `&category=${category}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    return data;
}

export const fetchTrendingIdeas = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trending-ideas`);
    const data = await res.json();
    return data || [];
}

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


export const fetchMyIdeas = async (email) => {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-ideas?email=${email}`
    );

    return await res.json();
};

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

export const deleteIdea = async (id) => {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/delete-idea/${id}`,
        {
            method: "DELETE",
        }
    );

    return await res.json();
};