import './title-section.css';

const TitleSection = (props) => {
    const { title, icon, done = false } = props;

    return (
        <article className={`d-flex gap-3 ${done ? 'bg-success' : 'bg-primary'} p-3 text-white rounded-top`} >
            <i className={`bi ${icon}`} style={{ fontSize: '1.3rem' }} />
            <h2 className="fs-3 m-0">{title}</h2>
        </article>
    );
};

export default TitleSection;