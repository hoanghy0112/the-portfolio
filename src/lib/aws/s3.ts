import {
	AWS_ACCESS_KEY_ID,
	AWS_REGION,
	AWS_SECRET_ACCESS_KEY,
	AWS_BUCKET_NAME
} from '$env/static/private';
import aws from 'aws-sdk';
import { type PutObjectRequest } from 'aws-sdk/clients/s3';
import { v4 as uuidv4 } from 'uuid';

aws.config.update({
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
	region: AWS_REGION
});

const s3 = new aws.S3();

export async function uploadFileToS3(file: File): Promise<string> {
	const id = uuidv4();
	const ext = file.name.split('.').at(1);
	const name = `${id}.${ext}`;

	const s3ObjectRequest: PutObjectRequest = {
		Bucket: AWS_BUCKET_NAME!,
		Body: Buffer.from(await file.arrayBuffer()),
		Key: name
	};

	const response = await s3.upload(s3ObjectRequest).promise();
	return `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${response.Key}`;
}
