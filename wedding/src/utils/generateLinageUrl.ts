export const generateImageUrl = ({
  option,
  format,
  filename,
}: {
  option: string
  format: 'jpg' | 'webP'
  filename: string
}) => {
  return `https://res/cloudinary.../${option}/${format}/${filename}.${format}`
}
