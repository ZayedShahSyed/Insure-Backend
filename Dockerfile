
# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /workspace

# copy everything and build the application (context is backend/app)
COPY . /workspace

# Use Maven to build the jar (skip tests to speed up build in CI)
RUN mvn -B -DskipTests package

# Runtime stage
FROM eclipse-temurin:21-jre-jammy
ARG JAR_FILE=target/*.jar
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /workspace/${JAR_FILE} /app/app.jar

# Copy entrypoint script
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x /app/entrypoint.sh


EXPOSE 8000

# Allow override of JVM options
ENV JAVA_OPTS=""

# Entrypoint will optionally create a truststore if AIVEN_CA_CERT is provided
ENTRYPOINT ["/app/entrypoint.sh"]