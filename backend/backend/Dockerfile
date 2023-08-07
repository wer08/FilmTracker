# Stage 1: Build the application
FROM maven:3.8.4-openjdk-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src/ /app/src/
RUN mvn clean package -DskipTests

# Stage 2: Create the final image
FROM openjdk:17-jdk-alpine
WORKDIR /app

# Copy the compiled JAR file from the build stage
COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the port that the application will listen on
EXPOSE 8090

# Set the command to run the application when the container starts
CMD ["java", "-jar", "app.jar"]
