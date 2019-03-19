import React, {useState} from 'react';

function Form() {

    const [formOpen, setFormOpen] = useState(false)

    function sendOffer(e){
        e.preventDefault()
    }

    function closeForm(e){
        e.preventDefault()
        setFormOpen(false)
    }

    function openForm(e){
        setFormOpen(true)
    }



    return <>
    
    <div className="content-item">
        <button className ="button green big" onClick={openForm}>
        Küsi pakkumist</button>
    </div>
    {formOpen && <div className="form">
        <div className="form-section">
            <div className="form-titlebox">
                <h2>Küsi pakkumist</h2>
            </div>
            <div className="form-notify error error-inputs" style={{ display: "none" }}>
                <p>Palun täida kõik kohustuslikud väljad!</p>
            </div>
            <div className="form-notify error error-sending" style={{ display: "none" }}>
                <p>Vormi saatmine ebaõnnestus, palun proovi hiljem uuesti või võta ühendust klienditeenindusega!</p>
            </div>
            <div className="form-notify success success-formsent" style={{ display: "none" }}>
                <p>Täname! Saime Teie soovi kätte. Meie spetsialist võtab Teiega hiljemalt ühe tööpäeva jooksul ühendust.</p>
            </div>
            <form id="orderPanelOffer" method="post">
                <div className="form-row two-column clearfix">
                    <div className="form-element">
                        <label htmlFor="company">Ettevõtte nimi: <span className="required">*</span></label>
                        <input type="text" name="company" id="company" />
                        <span className="input-note error-note">Nimi on kohustuslik</span>
                    </div>
                    <div className="form-element">
                        <label htmlFor="name">Ettevõtte esindaja nimi: <span className="required">*</span></label>
                        <input type="text" name="name" id="name" />
                        <span className="input-note error-note">Esindaja nimi on kohustuslik</span>
                    </div>
                </div>
                <div className="form-row two-column clearfix">
                    <div className="form-element">
                        <label htmlFor="email">E-post: <span className="required">*</span></label>
                        <input type="text" name="email" id="email" />
                        <span className="input-note error-note">E-post on kohustuslik</span>
                    </div>
                    <div className="form-element">
                        <label htmlFor="phone">Telefon: <span className="required">*</span></label>
                        <input type="tel" name="phone" id="phone" />
                        <span className="input-note error-note">Telefon on kohustuslik</span>
                    </div>
                </div>
                <div className="form-row clearfix">
                    <div className="form-element">
                        <label htmlFor="address">Planeeritava päikeseelektrisüsteemi aadress: <span className="required">*</span></label>
                        <input type="text" name="address" id="address" />
                        <span className="input-note error-note">Aadress on kohustuslik</span>
                    </div>
                </div>
                <div className="form-row two-column clearfix">
                    <div className="form-element">
                        <label htmlFor="eic">EIC-kood: </label>
                        <input type="text" name="eic" id="eic" />
                    </div>
                    <div className="form-element">
                        <label htmlFor="installation">Paigaldusviis: <span className="required">*</span></label>
                        <select id="installation" name="installation">
                            <option value="" selected="selected">Vali...</option>
                            <option value="katusele">Katusele</option>
                            <option value="maapinnale">Maapinnale</option>
                            <option value="muu">Muu</option>
                        </select>
                    </div>
                </div>
                <div className="form-row clearfix">
                    <div className="form-element">
                        <label htmlFor="comment">Kommentaarid: </label>
                        <textarea id="comment" name="comment"></textarea>
                    </div>
                </div>
                <div className="form-row">
                    <div className="buttons clearfix">
                        <button className="button green full" onClick={sendOffer}>Saadan!</button> {" "}
                        <button className="button alternate full" onClick={closeForm}>Katkestan</button>
                    </div>
                </div>
            </form>
        </div>
    </div>}
    
    </>
}

export default Form