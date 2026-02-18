FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
# Saara maal copy karo
COPY . .
# Folder ke andar jaakar permission fix karo aur build chalao
RUN chmod +x ./mvnw && ./mvnw clean package -DskipTests
EXPOSE 8080
# Jar file dhoond kar chalao
ENTRYPOINT ["sh", "-c", "java -jar target/*.jar"]