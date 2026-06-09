import React from 'react';
import useFetch from '../hooks/useFetch';

function Tweet() {
    const { data: items, loading, error } = useFetch('/tweets');

    if (loading) return <p>Loading tweets...</p>;
    if (error) return <p>Error loading tweets: {error}</p>;

    return (
        <section>
            {items.map((item, index) => (
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
            ))}
        </section>
    );
}

export default Tweet;
