import jwt from 'jsonwebtoken';
const getToken = async (userId) => {
    try {
        const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: "10d"
        });
        return token;
    } catch (error) {
        throw new Error("Error in generating token");
    }
}

export default getToken;