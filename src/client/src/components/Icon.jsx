const Icon = ({ icon, size = 16, color = "black" }) => {
  const IconComponent = icon;
  return <IconComponent className="align-self-center" size={size} color={color} />;
};

export default Icon;