import React, { useEffect, useState } from 'react';

function Menue() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('/menue');
            const data = await response.json();
            setItems(data);
        } catch (err) {
            setError('Failed to fetch menu items');
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setEditId(null);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const itemData = { name, description, price: Number(price), category };

        try {
            if (editId) {
                const response = await fetch(`/menue/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(itemData)
                });
                if (!response.ok) throw new Error('Failed to update item');
            } else {
                const response = await fetch('/menue', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(itemData)
                });
                if (!response.ok) throw new Error('Failed to create item');
            }
            resetForm();
            fetchItems();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (item) => {
        setEditId(item._id);
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price.toString());
        setCategory(item.category);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            const response = await fetch(`/menue/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete item');
            fetchItems();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section>
            <div className="container-fluid mt-4">
                <h2 className="mb-4">Menu Items</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">
                            {editId ? 'Edit Menu Item' : 'Add Menu Item'}
                        </h5>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mr-2">
                                {editId ? 'Update' : 'Add'}
                            </button>
                            {editId && (
                                <button
                                    type="button"
                                    className="btn btn-secondary ml-2"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                {items.length === 0 ? (
                    <p>No menu items found. Add one above!</p>
                ) : (
                    <div className="row">
                        {items.map((item) => (
                            <div key={item._id} className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">
                                            {item.category}
                                        </h6>
                                        <p className="card-text">{item.description}</p>
                                        <p className="card-text">
                                            <strong>${item.price.toFixed(2)}</strong>
                                        </p>
                                        <button
                                            className="btn btn-sm btn-warning mr-2"
                                            onClick={() => handleEdit(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger ml-2"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Menue;
