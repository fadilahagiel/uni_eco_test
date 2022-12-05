import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import axios from 'axios'

export default function HomePage() {
    const { users } = useSelector(state => state)
    const dispatch = useDispatch()
    const baseUrl = 'https://mushy-hare-fashion.cyclic.app'
    useEffect(() => {
        fetchUsers()
    }, [])
    const fetchUsers = async () => {
        const { data } = await axios({
            url: baseUrl
        })
        dispatch({
            type: 'USER/FETCHSUCCESS',
            payload: data
        })
    }

    return (
        <div style={{marginTop: '100px'}}>
            <h1 className="text-3xl font-bold">Data Users</h1>
            <div className="overflow-x-auto px-10 mt-6">
                <table className="table w-28 mx-auto text-xl border-2 border-black">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((el, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{el.name}</td>
                                    <td>{el.gender}</td>
                                    <td>{el.address}</td>
                                    <td> <Link to={'/form/'+el._id} className="btn modal-button btn-info w-20">Edit</Link></td>
                                </tr>
                            )
                        })}                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}