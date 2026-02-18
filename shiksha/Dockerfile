FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# Sabse pehle root se sab kuch copy karo
COPY . .

# Ab hum "shiksha" folder ke andar jaakar command chalayenge
RUN chmod +x ./shiksha/mvnw && cd shiksha && ./mvnw clean package -DskipTests

EXPOSE 8080

# Jar file ka path bhi sahi kar diya hai
ENTRYPOINT ["sh", "-c", "java -jar shiksha/target/*.jar"]