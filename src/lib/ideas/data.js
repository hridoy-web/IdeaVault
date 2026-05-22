
export const fetchIdeas = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas`);
    const data = await res.json();
    return data || [];
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