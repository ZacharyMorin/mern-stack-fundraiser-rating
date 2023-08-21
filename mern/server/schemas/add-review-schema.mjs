import Joi from "joi";



const addReviewSchema = Joi.object({
    _id: Joi.string().required(),
    fundraiser_name: Joi.string(),
    overall_rating: Joi.number(),
    reviews: Joi.array().items(
        Joi.object(
            {
                reviewer_name: Joi.string().required(),
                reviewer_email: Joi.string().email().required(),
                description: Joi.string(),
                rating: Joi.string().required(),
                review_date: Joi.string()
            }
        )
    )

})

export default addReviewSchema;
