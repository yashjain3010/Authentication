import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./CustomerDetails.css";

function CustomerDetails({ onCustomerUpdate, onAddressUpdate }) {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [abhaNumber, setAbhaNumber] = useState("");
  const [landmark, setLandmark] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers", error));
  }, []);

  const handleCustomerChange = (selectedOption) => {
    if (!selectedOption) {
      // If no customer is selected, reset the customer details
      setSelectedCustomer(null);
      setEmail("");
      setPhoneNumber("");
      setAge("");
      setSex("");
      setAbhaNumber("");
      setAddress1("");
      setAddress2("");
      setPostalCode("");
      setCity("");
      setState("");

      // Inform the parent that the customer is cleared
      onCustomerUpdate({});
      return;
    }

    const customerId = selectedOption.value;
    const customer = customers.find((cust) => cust.PKID === customerId);

    setSelectedCustomer(customer);
    setEmail(customer ? customer.Email : "");
    setPhoneNumber(customer ? customer.Mobile || customer.Phone : "");
    setAge(customer ? customer.Age : "");
    setSex(customer ? customer.Sex : "");
    setAbhaNumber(customer ? customer.AbhaNumber : "");

    if (customer && customer.Address) {
      const addressParts = customer.Address.split(", ");
      setAddress1(addressParts[0] || "");
      setAddress2(addressParts[1] || "");
      setPostalCode(addressParts[2] || "");
      setCity(addressParts[3] || "");
      setState(addressParts[4] || "");
    }

    // Update the parent component with the selected customer details
    onCustomerUpdate({
      ...customer,
      Address: customer.Address || "",
    });
  };

  const customerOptions = customers.map((customer) => ({
    value: customer.PKID,
    label: customer.UserName || "No Name",
  }));

  const handleAgeChange = (e) => {
    const inputAge = e.target.value;

    // Allow only digits and a maximum of 2 characters (for ages 1-99)
    if (/^\d{0,2}$/.test(inputAge)) {
      const parsedAge = parseInt(inputAge);

      // Check if parsed age is within the valid range
      if (parsedAge >= 1 && parsedAge <= 99) {
        setAge(inputAge);
        onCustomerUpdate({
          ...selectedCustomer,
          Age: parsedAge,
          Email: email,
          Mobile: phoneNumber,
          Address: `${address1}, ${address2}, ${postalCode}, ${city}, ${state}`,
        });
      } else {
        // If parsed age is invalid, clear the input field
        setAge("");
        alert("Please enter a valid age between 1 and 99.");
      }
    } else {
      // If input is not a valid number, clear the input field
      setAge("");
      alert("Please enter a valid age between 1 and 99.");
    }
  };

  const handleBlur = () => {
    const parsedAge = parseInt(age);
    if (age && (isNaN(parsedAge) || parsedAge < 1 || parsedAge > 99)) {
      alert("Please enter a valid age between 1 and 99.");
      setAge(""); // Clear invalid age input
    }
  };

  useEffect(() => {
    const fullAddress = `${address1} ${address2} ${postalCode} ${city} ${state}`;

    // Notify parent component with the full address
    onAddressUpdate(fullAddress);

    if (selectedCustomer) {
      onCustomerUpdate({
        ...selectedCustomer,
        Age: age,
        Value: selectedCustomer.PKID,
        Address: fullAddress,
        Email: email,
        Mobile: phoneNumber,
        Sex: sex,
      });
    }
  }, [
    address1,
    address2,
    postalCode,
    city,
    state,
    onAddressUpdate,
    selectedCustomer,
    onCustomerUpdate,
  ]);

  return (
    <div className="customer-details-card">
      <form className="form-handling">
        <h2>Customer Details</h2>

        <div className="form-group">
          <label>
            Customer Name<span className="star">*</span>
          </label>
          <Select
            className="select-input"
            options={customerOptions}
            onChange={handleCustomerChange}
            placeholder="Search and select a customer"
            isClearable
          />
        </div>

        <div>
          <div className="inline-1">
            <div className="inputs-width">
              <label htmlFor="contactNumber">
                Contact Number<span className="star">*</span>
              </label>
              <input
                type="number"
                id="contactNumber"
                value={phoneNumber}
                placeholder="Enter contact number"
                onChange={(e) => {
                  const input = e.target.value;

                  // Allow only 10 digits
                  if (input.length <= 10) {
                    setPhoneNumber(input);
                    onCustomerUpdate({
                      ...selectedCustomer,
                      Mobile: input,
                      Email: email, // Preserve current email
                      Address: `${address1}, ${address2}, ${postalCode}, ${city}, ${state}`, // Preserve current address
                    });
                  }
                }}
                onBlur={() => {
                  if (phoneNumber && phoneNumber.length !== 10) {
                    alert("Contact number must be exactly 10 digits.");
                  }
                }}
                required
              />
            </div>

            <div className="inputs-width">
              <label htmlFor="email">
                Email<span className="star">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => {
                  const input = e.target.value;
                  setEmail(input);
                  onCustomerUpdate({
                    ...selectedCustomer,
                    Email: input,
                    Mobile: phoneNumber, // Preserve current phone number
                    Address: `${address1}, ${address2}, ${postalCode}, ${city}, ${state}`, // Preserve current address
                  });
                }}
                onBlur={() => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for valid email
                  if (email && !emailRegex.test(email)) {
                    alert(
                      "Please enter a valid email address with '@' or a domain name."
                    );
                  }
                }}
                required
              />
            </div>
          </div>

          <div className="inline-2">
            <div className="inputs-width-2">
              <label htmlFor="age">
                Age<span className="star">*</span>
              </label>
              <input
                type="number"
                id="age"
                placeholder="Enter age"
                value={age}
                onChange={handleAgeChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="inputs-width-3">
              <label htmlFor="sex">
                Sex<span className="star">*</span>
              </label>
              <select
                id="sex"
                value={sex}
                onChange={(e) => {
                  const selectedSex = e.target.value;
                  setSex(selectedSex);
                  onCustomerUpdate({
                    ...selectedCustomer,
                    Sex: selectedSex,
                    Email: email,
                    Mobile: phoneNumber,
                    Address: `${address1} ${address2} ${postalCode} ${city} ${state}`,
                  });
                }}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="inputs-width-4">
              <label htmlFor="ABHA">ABHA Number</label>
              <input
                type="number"
                id="ABHA"
                value={abhaNumber || ""}
                placeholder="Enter contact number"
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only 10 digits
                  if (value.length <= 14) {
                    setAbhaNumber(value);
                  }
                }}
                onBlur={() => {
                  if (abhaNumber && abhaNumber.length !== 14) {
                    alert("ABHA number must be exactly 14 digits.");
                  }
                }}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address1">
            House No. & Floor<span className="star">*</span>
          </label>
          <input
            type="text"
            id="address1"
            value={address1}
            placeholder="Enter House No. & Floor"
            onChange={(e) => 
              {
                const value = e.target.value;
                if(!value.includes(",")){
                  setAddress1(value);
                } else{
                  alert("Address Line 1 cannot contain comma");
                }
              }}
              maxLength={50}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address2">Building & Block No.</label>
          <input
            type="text"
            id="address2"
            value={address2}
            placeholder="Enter Building & Block No."
            onChange={(e) => {
              const value = e.target.value;
              if(!value.includes(",")){
                setAddress2(value);
              }
              else{
                alert("Address Line 2 cannot contain comma");
              }
            }}
            maxLength={50}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="landmark">Landmark & Area Name</label>
          <input 
          type="text"
          id="landmark"
          value={landmark}
          placeholder="Enter Landmark & Area Name"
          onChange={(e) => {
            const value = e.target.value;
            if(!value.includes(",")){
              setLandmark(value);
            }
            else{
              alert("Landmark cannot contain comma");
            }
          }} 
          maxLength={50}
          />
        </div>
        <div className="inline-3">
          <div className="inputs-width-2">
            <label htmlFor="postalCode">
              Postal Code<span className="star">*</span>
            </label>
            <input
              type="number"
              id="postalCode"
              value={postalCode || ""}
              placeholder="Enter Postal Code"
              onChange={(e) => {
                const value = e.target.value;

                // Allow only 10 digits
                if (value.length <= 6) {
                  setPostalCode(value);
                }
              }}
              onBlur={() => {
                if (postalCode && postalCode.length !== 6) {
                  alert("Postal Code must be exactly 6 digits.");
                }
              }}
              required
            />
          </div>

          <div className="inputs-width-5">
            <label htmlFor="city">
              City<span className="star">*</span>
            </label>
            <input
              type="text"
              id="city"
              value={city}
              placeholder="Enter city"
              onChange={(e) => {
                const value = e.target.value;
                if(!value.includes(",")){
                  setCity(value);
                }
                else{
                  alert("City cannot contain comma");
                }
              }}
              required
            />
          </div>

          <div className="inputs-width-4">
            <label htmlFor="state">
              State<span className="star">*</span>
            </label>
            <input
              type="text"
              id="state"
              value={state}
              placeholder="Enter state"
              onChange={(e) => {
                const value = e.target.value;
                if(!value.includes(",")){
                  setState(value);
                }
                else{
                  alert("State cannot contain comma");
                }
              }}
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CustomerDetails;
