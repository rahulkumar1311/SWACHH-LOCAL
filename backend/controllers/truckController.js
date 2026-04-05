// Truck ki dummy location generate karna map ke liye
export const getTruckLocation = (req, res) => {
  // Thoda random movement add kar rahe hain Patna ke coordinates mein
  // Isse UI mein truck har baar thoda aage badhta hua dikhega
  const lat = 25.6100 + (Math.random() * 0.002);
  const lng = 85.1410 + (Math.random() * 0.002);
  
  res.status(200).json({ 
    truckNo: "BR01GA1234", 
    lat: lat, 
    lng: lng, 
    lastUpdated: new Date() 
  });
};

// Truck ka ETA (Estimated Time of Arrival) bhejna
export const getTruckETA = (req, res) => {
  res.status(200).json({
    // 100m se 600m ke beech ka random distance
    distance: Math.floor(Math.random() * 500) + 100, 
    eta: "12:08",
    message: "Garbage truck is approaching your sector"
  });
};