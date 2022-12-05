import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from 'axios'

export default function EditForm() {
    let [input, setInput] = useState({})
    let [addressInput, setAddressInput] = useState({})
    let [errors, setErros] = useState('')
    let [index, setIndex] = useState(0)
    let { user } = useSelector(state => state)
    let dispatch = useDispatch()
    const navigate = useNavigate()
    const baseUrl = 'https://mushy-hare-fashion.cyclic.app'
    const { _id } = useParams()
   
    const addressClick = (idx) => {
        setAddressInput(user.addr[idx])
        setIndex(idx)
    }

    const fetchUser = async () => {
        const { data } = await axios({
            url: `${baseUrl}/${_id}`
        })
        dispatch({
            type: 'USER/FETCHONESUCCESS',
            payload: data
        })
        setInput(data)
    }
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleAddressChange = (e) => {
        setAddressInput({
            ...addressInput,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        fetchUser()
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!input.email) {
            return setErros(`Required`)
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email)) {
           return setErros('Invalid email address')
        }
       await axios({
            url: `${baseUrl}/${_id}`,
            method: "PUT",
            data: input
        })
        navigate('/')
    }

    const addressSubmit = (e) => {
        const newAddress = input.addr
        newAddress[index] = addressInput
        setInput({
            ...input,
            addr: newAddress
        })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="card flex-shrink-0 w-full max-w-5xl shadow-2xl bg-base-100 p-9">
                    <Link to="/" className="btn btn-error mx-3 w-20">Back</Link>
                    <h1 className="text-3xl font-bold">Form Edit</h1>
                    <form onSubmit={submitHandler} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl">Email</span>
                            </label>
                            {errors ?
                                <div>
                                    <span style={{color: 'red'}} className='font-black'>
                                        {errors}
                                    </span>
                            </div> : null}
                            <input
                                value={input.email}
                                onChange={handleChange}
                                name="email"
                                type="text"
                                placeholder="email"
                                className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                    <span className="label-text text-2xl">Address</span>
                                    :  <></>
                            </label>
                            {input?.addr?.map((el, idx) => {
                                return (
                                    <div className="border-4 border-black mb-2 p-6 flex justify-between" key={idx} >
                                        <div>
                                            <div className="flex justify-between pr-9">
                                                <label className="label">
                                                    <span className="label-text font-black+">Address {idx + 1}</span>
                                                </label>
                                            </div>
                                            <div className="flex">
                                                <div className="mr-4">
                                                    <label className="label">
                                                        <span className="label-text font-bold">Street</span>
                                                    </label>
                                                    <h1>{el.street}</h1>
                                                </div>
                                                <div className="mr-4">
                                                    <label className="label">
                                                        <span className="label-text font-bold">Number</span>
                                                    </label>
                                                    <h1>{el.house}</h1>
                                                </div>
                                                <div className="mr-4">
                                                    <label className="label">
                                                        <span className="label-text font-bold">City</span>
                                                    </label>
                                                    <h1>{el.city}</h1>
                                                </div>
                                                <div className="mr-4">
                                                    <label className="label">
                                                        <span className="label-text font-bold">Country</span>
                                                    </label>
                                                    <h1>{el.country}</h1>
                                                </div>

                                            </div>
                                        </div>
                                        <label onClick={() => addressClick(idx)} htmlFor="my-modal-3" className="label-text mt-7 btn modal-button btn-info w-20">Edit </label>
                                    </div>
                                )
                            })}
                        </div> 
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl">Street</span>
                            </label>
                            <input
                                value={addressInput.street}
                                onChange={handleAddressChange}
                                name="street"
                                type="text"
                                placeholder="street"
                                className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl">Number</span>
                            </label>
                            <input
                                value={addressInput.house}
                                onChange={handleAddressChange}
                                name="house"
                                type="text"
                                placeholder="number"
                                className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl">City</span>
                            </label>
                            <input
                                value={addressInput.city}
                                onChange={handleAddressChange}
                                name="city"
                                type="text"
                                placeholder="city"
                                className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl">Country</span>
                            </label>
                            <input
                                value={addressInput.country}
                                onChange={handleAddressChange}
                                name="country"
                                type="text"
                                placeholder="country"
                                className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <label onClick={addressSubmit} htmlFor="my-modal-3" className="btn bg-sky-500/100">
                                Save
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}