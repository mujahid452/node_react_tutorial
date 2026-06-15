import React from 'react';
import {Link} from 'react-router-dom';

function Configurations() {
    return(
        <section>
            <div class="container-fluid">
                <h1 class="mt-5">Configurations</h1>
                <p>Manage your application settings and features below.</p>
                <div class="list-group mt-3 w-50">
                    <Link to='/menue' class="list-group-item list-group-item-action">
                        Menu Management
                    </Link>
                    <Link to='/items' class="list-group-item list-group-item-action">
                        Items Management
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Configurations;
