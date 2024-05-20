'use client'

import { getDictionary } from '@/i18n'
import { Document, Image, Page, Styles, Text, View } from '@react-pdf/renderer'

interface ResumePdfProps {
	styles: Styles
	avatar: string
	dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const ResumePdf = ({ styles, avatar, dictionary }: ResumePdfProps) => {
	// Font.register({
	//     family: '',
	//     font: ''
	// })
	return (
		<Document
			title='resume download'
			author='Chris Ley'
			pageMode='useOutlines'
			pageLayout='singlePage'
		>
			<Page
				size='A4'
				style={styles.page}
			>
				{/* Personal Info */}
				<View style={styles.personalInfoSection}>
					<View style={styles.personalInfoDesc}>
						<Text style={styles.name}>Chris Ley</Text>
						<View style={styles.personalInfo}>
							{/* Array style has no effects, but why? */}
							<Text style={{ ...styles.secondaryInfo, ...styles.rightLine }}>
								Male
							</Text>
							<Text style={{ ...styles.secondaryInfo, ...styles.rightLine }}>
								Age
							</Text>
							<Text style={{ ...styles.secondaryInfo, ...styles.rightLine }}>
								17671712803
							</Text>
							<Text style={styles.secondaryInfo}>201357337@qq.com</Text>
						</View>
						<View style={styles.personalInfo}>
							{/* Array style has no effects, but why? */}
							<Text style={{ ...styles.secondaryInfo, ...styles.rightLine }}>
								5 year work experience
							</Text>
							<Text style={{ ...styles.secondaryInfo, ...styles.rightLine }}>
								{dictionary.resume['Position']}：前端开发工程师
							</Text>
							<Text style={{ ...styles.secondaryInfo, ...styles.rightLine }}>
								{dictionary.resume['City']}：广州
							</Text>
						</View>
					</View>
					<View>
						<Image
							src={avatar}
							style={{
								height: '100px',
								width: '100px',
							}}
						/>
					</View>
				</View>
				{/* Prefessional Summary */}
				<View style={styles.section}>
					<View style={styles.sectionTitle}>
						<Text>{dictionary.resume['Professional Summary']}</Text>
					</View>
				</View>
				{/* Employment History */}
				<View style={styles.section}>
					<View style={styles.sectionTitle}>
						<Text>{dictionary.resume['Employment History']}</Text>
					</View>
				</View>
				{/* Project List */}
				<View style={styles.section}>
					<View style={styles.sectionTitle}>
						<Text>{dictionary.resume['Project List']}</Text>
					</View>
				</View>
				{/* Education */}
				<View style={styles.section}>
					<View style={styles.sectionTitle}>
						<Text>{dictionary.resume['Education']}</Text>
					</View>
				</View>
			</Page>
		</Document>
	)
}

export default ResumePdf
