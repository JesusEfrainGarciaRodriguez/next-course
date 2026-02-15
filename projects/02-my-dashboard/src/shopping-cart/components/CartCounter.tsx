"use client"
import { useAppDispatch, useAppSelector } from '@/store';
import { addOne, initCounterState, subtractOne } from '@/store/counter/counterSlice';
import React, { useEffect } from 'react'

export interface CounterResponse {
    method: string;
    count: number;
}

const getApiCounterValue = async (): Promise<CounterResponse> => {
    try {
        const response = await fetch('/api/counter');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching API counter value:', error);
        return { method: 'error', count: 0 };
    }
}

export function CartCounter() {
    const count = useAppSelector(state => state.counter.count);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getApiCounterValue().then(data => {
            dispatch(initCounterState(data.count))
        })
    }, [dispatch]);

    return (
        <>
            <span className="text-9xl">{count}</span>

            <div className="flex">
                <button
                    className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
                    onClick={() => dispatch(addOne())}>
                    +1
                </button>
                <button className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
                    onClick={() => dispatch(subtractOne())}>
                    -1
                </button>
            </div>
        </>
    )
}
