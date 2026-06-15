import React, {useEffect, useState} from 'react';

function Items() {
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState('');

    const fetchItems = async () => {
        const data = await fetch('/items');
        const items = await data.json();
        setItems(items);
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

        const itemData = {name, description, price: Number(price), category};

        if (editId) {
            const response = await fetch(`/items/${editId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(itemData)
            });
            if (!response.ok) {
                setError('Failed to update item');
                return;
            }
        } else {
            const response = await fetch('/items', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(itemData)
            });
            if (!response.ok) {
                setError('Failed to create item');
                return;
            }
        }
        resetForm();
        fetchItems();
    };

    const handleEdit = (item) => {
        setEditId(item.id);
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price.toString());
        setCategory(item.category);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        const response = await fetch(`/items/${id}`, {method: 'DELETE'});
        if (!response.ok) {
            setError('Failed to delete item');
            return;
        }
        fetchItems();
    };

    return(
        <section>
            <div class="container-fluid mt-4">
                <h2 class="mb-4">Items</h2>

                {error && <div class="alert alert-danger">{error}</div>}

                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            {editId ? 'Edit Item' : 'Add Item'}
                        </h5>
                        <form onSubmit={handleSubmit}>
                            <div class="form-group mb-2">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div class="form-group mb-2">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div class="form-group mb-2">
                                <input
                                    type="number"
                                    class="form-control"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div class="form-group mb-2">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" class="btn btn-primary mr-2">
                                {editId ? 'Update' : 'Add'}
                            </button>
                            {editId && (
                                <button
                                    type="button"
                                    class="btn btn-secondary ml-2"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                {items.length === 0 ? (
                    <p>No items found. Add one above!</p>
                ) : (
                    <div class="row">
                        {items.map(item => (
                            <div key={item.id} class="col-md-4 mb-3">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">{item.name}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">
                                            {item.category}
                                        </h6>
                                        <p class="card-text">{item.description}</p>
                                        <p class="card-text">
                                            <strong>${Number(item.price).toFixed(2)}</strong>
                                        </p>
                                        <button
                                            class="btn btn-sm btn-warning mr-2"
                                            onClick={() => handleEdit(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            class="btn btn-sm btn-danger ml-2"
                                            onClick={() => handleDelete(item.id)}
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

export default Items;
