#!/usr/bin/env sh
set -e

# If AIVEN_CA_CERT is provided (PEM text), write it and import into a Java truststore
if [ -n "$AIVEN_CA_CERT" ]; then
  echo "Writing Aiven CA to ./aiven-ca.pem"
  echo "$AIVEN_CA_CERT" > ./aiven-ca.pem

  # Create a truststore from PEM. Use keytool to import the cert.
  TRUSTSTORE=./aiven-truststore.jks
  TRUSTSTORE_PASS=changeit

  echo "Creating Java truststore at $TRUSTSTORE"
  # Remove if already exists
  if [ -f "$TRUSTSTORE" ]; then
    rm -f "$TRUSTSTORE"
  fi

  # Import certificate (alias aiven-ca)
  keytool -importcert -noprompt -trustcacerts -alias aiven-ca -file ./aiven-ca.pem -keystore "$TRUSTSTORE" -storepass "$TRUSTSTORE_PASS"

  # Export truststore location to JVM opts
  JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.trustStore=$TRUSTSTORE -Djavax.net.ssl.trustStorePassword=$TRUSTSTORE_PASS"
fi

echo "Starting application with JAVA_OPTS=$JAVA_OPTS"
exec sh -c "java $JAVA_OPTS -jar ./app.jar"