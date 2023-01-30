export const HeadingView = ({title, description, className}: {
    title: string,
    description: string,
    className?: string
}) => {
    return (
        <div className={"prose my-10 " + className}>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}