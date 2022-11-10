export const CurrentPost = () => {
    return (
        <section>
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-6">
                        <div className="img-wrapper">
                            <div className="after" />
                            <img src="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?cs=srgb&dl=pexels-pixabay-262508.jpg&fm=jpg" className="w-100" alt="About Us" />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <h6 className="title mb-3">
                            Lorem ipsum dolor sit amet, consectetur.
                        </h6>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae autem
                            rem impedit molestiae hic ducimus, consequuntur ullam dolorem
                            quaerat beatae labore explicabo, sint laboriosam aperiam nihil
                            inventore facilis. Quasi, facilis.
                        </p>
                        <a className="btn btn-outline-primary btn-sm">Edit</a>
                        <a className="btn btn-outline-primary btn-sm">Delete</a>
                    </div> 
                </div>
            </div>
        </section>
    );
}