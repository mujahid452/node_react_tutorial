import React, {useEffect, useState} from 'react';

function Tweet() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/tweets');
            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setItems(data);
        } catch (err) {
            console.error('Failed to fetch tweets:', err);
            setError(err.message || 'Failed to load tweets');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section>
                <div className="container-fluid p-3">
                    <p>Loading tweets...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section>
                <div className="container-fluid p-3">
                    <p style={{ color: 'red' }}>Error: {error}</p>
                    <button onClick={fetchItems}>Retry</button>
                </div>
            </section>
        );
    }

    return(
        <section>
            {
            items.map((item, index) => (
                <div key={index} className="container-fluid p-3 w-50">
                    <div className="card-deck">
                        <div className="card">
                            <div className="card-body p-1">
                                <h6 className="card-title">{item.name}</h6>
                                <p className="card-text">{item.msg}</p>
                                <p className="card-text"><i>by {item.username}</i></p>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </section>
    );
}

export default Tweet;