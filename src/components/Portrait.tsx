export const Portrait = ({
  src = "profile/profile.jpg",
  alt = "Mickael Lin",
  className = "",
}: {
  src?: string
  alt?: string
  className?: string
}) => (
  <img src={src} alt={alt} className={`object-cover object-top ${className}`} />
)
