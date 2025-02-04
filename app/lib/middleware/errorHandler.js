
import { NextResponse } from 'next/server';


export const errorHandler = async (err) => {
    console.error(err.stack); // Log the error for debugging

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    return NextResponse.json(
        { success: false, error: message },
        { status: statusCode }
    );

}