import './nofound.css';

const NoFound = () => {

    return (
        <main className="main bg-light h-100 d-flex flex-column align-items-center justify-content-center">
            <div className='container'>
                <h1 className='text-dark'>404</h1>
                <p className='text-dark'>Not found</p>
            </div>
        </main>
    );
};

export default NoFound;