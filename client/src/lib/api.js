// client/src/lib/api.js
export const queryRAG = async (text) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: text }),
        });
        return response.json();
    } catch (error) {
        console.error('Error querying RAG:', error);
        throw error;
    }
};
