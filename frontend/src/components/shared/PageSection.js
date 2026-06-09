import React from 'react';

function PageSection({ children, className = '' }) {
    return (
        <section>
            <div className={`container-fluid ${className}`.trim()}>
                {children}
            </div>
        </section>
    );
}

export default PageSection;
