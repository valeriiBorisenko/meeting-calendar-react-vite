import './main.css';

const Main = ({ children }) => {

    return (
        <main className="main bg-light d-flex overflow-hidden position-relative">
            <div className='container d-flex flex-column flex-sm-row gap-3 gap-md-4 mt-5 mb-5'>
                { children }
            </div>
        </main>
    );
};

export default Main;