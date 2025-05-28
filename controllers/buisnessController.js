import Business from "../model/Business.js";
// import fs from "fs";
import pkg from 'pdfkit-table';
const { PDFDocumentWithTables } = pkg;
// import PDFTable from "pdfkit-table";
import { addBusinessService } from "../services/addBusinessService.js";
const excludedCategories = [
    "Automotive (Car dealerships, auto repair shops, tire shops, car rental services)",
    "Beauty and Wellness (Spas, salons, gyms, massage therapists, wellness coaches)",
    "Education and Training (Schools, tutoring centers, online course providers, training workshops)",
    "Financial Services (Insurance, investment firms, mortgage brokers)",
    "Healthcare Providers (Doctors, dentists, chiropractors, clinics, pharmacies)",
    "Home Improvement (Contractors, electricians, HVAC services, painters, carpenters)",
    "Manufacturers and Distributors (Companies involved in the production or distribution of goods)",
    "Professional Services (Law firms, accounting firms, consultants, architects, financial advisors)",
    "Real Estate (Realtors, property management, property developers)",
    "Religion and Charity (Masjid, religious scholar, charity, non-profit)",
    "Restaurants and Food (Dine-in, fast food, café, food truck)",
    "Retail Stores (clothing, grocery stores)",
    "Service Providers (Plumbing, landscaping, cleaning, repair services)",
    "Tech and IT Services (Software company, app developer, web design agencies, IT support)",
    "Transportation and Logistics (Moving, shipping, delivery services, courier services)",
    "Travel and Tourism (Travel agencies, tour operators, hotels, tourism services)",
];
export const addBusinessController = async (req, res) => {
    try {
        const result = await addBusinessService(req.body);
        res.status(200).json({
            message: "Business Details added successfully",
            result,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getBusinessController = async (req, res) => {
    const { businessCategory = "All", page = 1, limit = 12, search = "" } = req.query;
    console.log(limit);
    const regex = new RegExp(search, "i");
    const query = {};

    if (search) {
        query.$or = [
            { businessName: regex },
            { businessCategory: regex },
            { businessDescription: regex },
            { firstName: regex },
            { lastName: regex },
            { city: regex },
            { state: regex },
            { email: regex },
            { website: regex },
        ];
    }
    if (businessCategory === "Other (If you are not listed select this option)") {
        query.businessCategory = { $nin: excludedCategories };
    } else if (businessCategory && businessCategory !== "All") {
        query.businessCategory = businessCategory;
    }

    console.log(query);

    const items = await Business.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
    const totalItemsCount = await Business.countDocuments(query);
    const totalPages = Math.ceil(totalItemsCount / limit);
    res.status(200).json({ items, totalItemsCount, totalPages, currentPage: page });
};

export const getBusinessPdfController = async (req, res) => {
    
    const { businessCategory = "All",  search = "" } = req.query;
    console.log('heloo-----')
    const regex = new RegExp(search, "i");
    const query = {};

    if (search) {
        query.$or = [
            { businessName: regex },
            { businessCategory: regex },
            { businessDescription: regex },
            { firstName: regex },
            { lastName: regex },
            { city: regex },
            { state: regex },
            { email: regex },
            { website: regex },
        ];
    }
    if (businessCategory === "Other (If you are not listed select this option)") {
        query.businessCategory = { $nin: excludedCategories };
    } else if (businessCategory && businessCategory !== "All") {
        query.businessCategory = businessCategory;
    }

    // console.log(query);

    const data = await Business.find(query);
    console.log(data)

   
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=business-directory.pdf');

const doc = new PDFDocumentWithTables();
  doc.pipe(res);

  doc.fontSize(18).text('Business Directory', { align: 'center' });
  doc.moveDown();

  const table = {
    headers: [
      { label: 'Business Name', property: 'businessName', width: 100 },
      { label: 'Category', property: 'businessCategory', width: 80 },
      { label: 'Founder', property: 'founder', width: 100 },
      { label: 'Contact', property: 'contactNumber', width: 90 },
      { label: 'Email', property: 'email', width: 130 },
      { label: 'Address', property: 'address', width: 150 },
    ],
    datas: data.map(item => ({
      businessName: item.businessName,
      businessCategory: item.businessCategory,
      founder: `${item.firstName} ${item.lastName}`,
      contactNumber: item.contactNumber,
      email: item.email,
      address: `${item.streetAddress}${item.streetAddress2 ? ', ' + item.streetAddress2 : ''}, ${item.city}, ${item.state} - ${item.postalCode}`,
    })),
  };

  await doc.table(table, {
    prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
    prepareRow: () => doc.font('Helvetica').fontSize(10),
    padding: 5,
    columnSpacing: 10,
    width: doc.page.width - doc.options.margin * 2,
  });

  doc.end();
};