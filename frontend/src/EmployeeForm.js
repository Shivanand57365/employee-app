import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        employee_id: '',
        name: '',
        email: '',
        phone_number: '',
        department: '',
        date_of_joining: '',
        role: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        if (!formData.employee_id) {
            return "Employee ID is required.";
        }

        const namePattern = /^[a-zA-Z\s]+$/;
        if (!formData.name) {
            return "Name is required.";
        } else if (!namePattern.test(formData.name)) {
            return "Name must only contain alphabets and spaces.";
        } else if (formData.name.length < 3) {
            return "Name must be at least 3 characters long.";
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email) {
            return "Email is required.";
        } else if (!emailPattern.test(formData.email)) {
            return "Please enter a valid email address.";
        }

        const phonePattern = /^\d{10}$/;
        if (!formData.phone_number) {
            return "Phone number is required.";
        } else if (!phonePattern.test(formData.phone_number)) {
            return "Phone number must be exactly 10 digits.";
        }


        if (!formData.department) {
            return "Please select a department.";
        }

        if (!formData.date_of_joining) {
            return "Date of joining is required.";
        }

       
        if (!formData.role) {
            return "Role is required.";
        }

        return ''; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/employees', formData);
            setSuccess(response.data);
        } catch (err) {
            setError(err.response ? err.response.data : 'Error submitting the form');
        }
    };

    return (
        <div>
            <h2>Employee</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="employee_id"
                    placeholder="Employee ID"
                    value={formData.employee_id}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                />
                <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                </select>
                <input
                    type="date"
                    name="date_of_joining"
                    value={formData.date_of_joining}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="role"
                    placeholder="Role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit">Submit</button>
                <button type="reset" onClick={() => setFormData({
                    employee_id: '',
                    name: '',
                    email: '',
                    phone_number: '',
                    department: '',
                    date_of_joining: '',
                    role: '',
                })}>Reset</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
