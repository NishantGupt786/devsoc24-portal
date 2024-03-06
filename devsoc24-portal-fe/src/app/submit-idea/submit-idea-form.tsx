import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface FormValues {
    projectName: string;
    projectTrack: string;
    description: string;
    figmaLink: string;
    githubLink: string;
    otherLinks: string;
}

const tracks = ['Track 1', 'Track 2', 'Track 3'];


export default function SubmitIdeaForm() {
    const initialValues: FormValues = {
        projectName: '',
        projectTrack: '',
        description: '',
        figmaLink: '',
        githubLink: '',
        otherLinks: ''
    };
    const onSubmit = (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setSubmitting(false);
    };

    return (

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <div className='flex justify-start gap-12'>
                    <div>
                        <div>
                            {/* <Input
                                className='rounded-2xl light'
                                type="text"
                                label={<label className="text-[#0019FF] font-medium">Project Name<span className='text-[#FF0000]'>*</span></label>}
                                labelPlacement="outside"
                                placeholder='Project Name goes here'
                                name='projectName'
                                color={'primary'}
                            /> */}
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="project-name">Project Name*</Label>
                                <Input
                                    type="text"
                                    id="project-name"
                                    placeholder="Shuttle tracker"
                                    className=''
                                    style={{ backgroundColor: 'white' }}

                                />
                            </div>
                            <ErrorMessage name="projectName" component="div" />
                        </div>
                        <div>
                            <Label htmlFor="project-track">Project Project*</Label>

                            <Select>
                                <SelectTrigger id="project-track" className="w-[180px]">
                                    <SelectValue placeholder="Open Innovation" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tracks.map((track) => (
                                        <SelectItem key={track} value={track}>
                                            {track}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <ErrorMessage name="projectTrack" component="div" />
                        </div>
                        <div>
                            <Label htmlFor="description">Description of Project*</Label>

                            <Textarea
                                id='description'
                                placeholder="Don't forget to include your inspiration, learnings, project construction method, and difficulties you encountered in your writing. "
                                className="col-span-12 md:col-span-6 mb-6 md:mb-0 "
                                style={{ color: 'background' }}
                            />
                            <ErrorMessage name="description" component="div" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <Label htmlFor="figmaLink">Figma Link</Label>
                            <Input
                                type="text"
                                id="figmaLink"
                                placeholder="Figma link"
                                className=''
                                style={{ backgroundColor: 'white' }}

                            />
                            <ErrorMessage name="figmaLink" component="div" />
                        </div>
                        <div>
                            <Label htmlFor="githubLink">GitHub Link</Label>
                            <Input
                                type="text"
                                id="githubLink"
                                placeholder="Github link"
                                className=''
                                style={{ backgroundColor: 'white' }}

                            />
                            <ErrorMessage name="githubLink" component="div" />
                        </div>
                        <div>
                            <Label htmlFor="otherLinks">Other Links</Label>

                            <Textarea
                                id='otherLinks'
                                placeholder='Other links'
                                className="col-span-12 md:col-span-6 mb-6 md:mb-0 "
                                style={{ color: 'background' }}
                            />
                            <ErrorMessage name="otherLinks" component="div" />
                        </div>
                    </div>

                    </div>



                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
}