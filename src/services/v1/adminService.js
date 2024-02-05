const bcrypt = require('bcrypt');
const Admin = require('../../models/v1/Admin');

const adminService = {
	index: async (_req) => {
		try {
			const admins = await Admin.find();

			return {
				status: 200,
				message: 'Admin List',
				data: admins,
			};
		} catch (error) {
			throw new Error(error);
		}
	},

	store: async (req) => {
		try {
			console.log(req.body);

			const checkEmail = await Admin.findOne({
				email: req.body.email,
			});

			if (checkEmail) {
				throw new Error('Email Already Existed');
			}
			req.body.password = bcrypt.hashSync(req.body.password, 8);

			const newAdmin = new Admin(req.body);
			const admin = await newAdmin.save();

			return {
				status: 200,
				message: 'Admin Create Successfully',
				data: admin,
			};
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	},

	show: async (req) => {
		try {
			const admin = await Admin.findById(req.params.id);
			if (!admin) {
				throw new Error('Admin not found');
			}

			return {
				status: 200,
				message: 'Admin Detail',
				data: admin,
			};
		} catch (error) {
			throw new Error(Error);
		}
	},

	update: async (req) => {
		try {
			const admin = await Admin.findById(req.params.id);
			if (!admin) {
				throw new Error('Admin not found');
			}

			// password pay change ma change decision cha pee mha update lote thint (optional)
			req.body.password = bcrypt.hashSync(req.body.password, 8);
			const updatedAdmin = await Admin.findByIdAndUpdate(req.body);
			if (updatedAdmin) {
				return {
					status: 200,
					message: 'Admin Updated Successfully',
					data: updatedAdmin,
				};
			}
		} catch (error) {
			throw new Error(error);
		}
	},

	delete: async (req) => {
		try {
			const admin = await Admin.findById(req.params.id);

			if (!admin) {
				throw new Error('Admin not found');
			}

			const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);

			if (deletedAdmin) {
				return {
					status: 200,
					message: 'Admin Deleted Successfully',
				};
			}
		} catch (error) {
			throw new Error(error);
		}
	},
};

module.exports = adminService;
