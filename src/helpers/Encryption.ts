import bcrypt from "bcrypt";

export const hashData = async (data) => {
    return bcrypt.hash(data, 10);
};

export const compareData = async (data, hashedData) => {
    const result = await bcrypt.compare(data, hashedData);
    return result
};
