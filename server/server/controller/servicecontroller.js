const errorHandler = require("../middleware/500");
const User = require('../models/usermodel'); // Adjust the path as needed
const Service = require("../models/servicemodel");


const newService = async (req, res) => {
    try {
        const file = req.file.path;
        const formData = req.body;

        if (!file) {
            return res.status(422).json({ error: "Please upload an image." });
        }

        if (!formData.Description) {
            return res.status(422).json({ error: "Description is required." });
        }

        if (!formData.companyName) {
            return res.status(422).json({ error: "Company name is required." });
        }

        if (!formData.Phonenumber || isNaN(parseInt(formData.Phonenumber))) {
            return res.status(422).json({ error: "Valid phone number is required." });
        }

        const image = `http://localhost:5000/${file}`;
        const newService = new Service({
            user_id: formData.userId,
            attachments: image,
            companyname: formData.companyName,
            description: formData.Description,
            phone: parseInt(formData.Phonenumber),
            approved: formData.approved

        });

        const service = await newService.save();
        res.status(201).json(service);
        console.log(service)
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
};


const approvedServices = async (req, res) => {
    try {
        const services = await Service.find({ approved: true });

        return res.json(services);
    } catch (e) {
        return errorHandler(e, req, res);
    }
};



const AllservicesByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const services = await Service.find({ user_id: userId });
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching services. Please try again later.' });
    }
}




const oneServiceById = async (req, res) => {
    try {
        const id = req.params.id;
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ message: 'service not found' })
        }
        const provider = await user.findById(service.user_id);
        return res.json({
            provider,
            service
        });
    } catch (e) {
        return errorHandler(e, req, res);
    }
};

const updateService = async (req, res) => {
    try {
        const id = req.params.id;
        let data = req.body;

        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({ error: 'service not found' });
        }


        const fillable = [
            'description',
            'phone',
            'companyname'
        ];

        const updateData = {}

        fillable.forEach(function (filterItem) {
            if (data[filterItem]) {
                updateData[filterItem] = data[filterItem];
            }
        }
        );

        updateData.updated_at = Date.now();

        const updatedItem = await Service.findByIdAndUpdate(id, updateData);

        return res.json(updatedItem);
    } catch (e) {
        return errorHandler(e, req, res);
    }
};


// dashboard

const allServices = async (req, res) => {
    try {
        if (req.query.description) {
            req.query.description = { $regex: '.*' + req.query.description + '.*' };
        }

        const services = await Service.find(req.query);

        return res.json(services); // Return only the services data
    } catch (e) {
        return errorHandler(e, req, res);
    }
};

const updateServiceApproval = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const updatedService = await Service.findByIdAndUpdate(serviceId, { approved: true }, { new: true });

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        return res.json(updatedService);
    } catch (e) {
        return errorHandler(e, req, res);
    }
};
// dashboard

const deleteService = async (req, res) => {
    try {
        const id = req.params.id;
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ error: 'service not found' });
        }

        const deletedService = await Service.findByIdAndRemove(id);
        return res.status(200).json({ message: 'service deleted successfully', deletedService });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Failed to remove service' });
    }
};


module.exports = {
    allServices,
    AllservicesByUserId,
    oneServiceById,
    newService,
    updateService,
    deleteService,
    updateServiceApproval,
    approvedServices
}; 
