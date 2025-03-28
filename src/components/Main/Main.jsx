import './main.css';

const Main = ({ children }) => {

    return (
        <main className="main bg-light d-flex">
            <div className='container d-flex gap-2 gap-sm-3 gap-md-4 mt-5 mb-5'>
                { children }
            </div>
        </main>
    );
};

export default Main;