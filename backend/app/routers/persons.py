from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

from app.database import get_db
from app.models.area import Area
from app.models.person import Person
from app.models.translation import Translation


router = APIRouter(
    prefix="/api/persons",
    tags=["Persons"],
)


def get_translations(
    db: Session,
    person_id: str,
    language_code: str,
):
    translations = (
        db.query(Translation)
        .filter(
            Translation.entity_type == "persons",
            Translation.entity_id == person_id,
            Translation.language_code == language_code,
        )
        .all()
    )

    return {
        translation.field_name: translation.translated_text
        for translation in translations
    }


@router.get("/")
def get_persons(
    lang: str = "te",
    db: Session = Depends(get_db),
):
    persons = (
        db.query(Person)
        .options(
            joinedload(Person.area).joinedload(Area.district),
            joinedload(Person.punishments),
        )
        .all()
    )

    result = []

    for person in persons:

        # Get translations for selected language
        translations = get_translations(
            db,
            person.person_id,
            lang,
        )

        # Original Telugu values are used as fallback
        name = translations.get(
            "name",
            person.name,
        )

        father_name = translations.get(
            "father_name",
            person.father_name,
        )

        village = translations.get(
            "village",
            person.village,
        )

        result.append(
            {
                "person_id": person.person_id,
                "name": name,
                "father_name": father_name,
                "village": village,

                "area": {
                    "area_id": person.area.area_id,
                    "area_name": person.area.area_name,
                }
                if person.area else None,

                "district": {
                    "district_id": person.area.district.district_id,
                    "district_name": person.area.district.district_name,
                }
                if person.area and person.area.district else None,

                "punishments": [
                    {
                        "punishment_id": punishment.punishment_id,
                        "punishment": punishment.punishment,
                        "punishment_year": punishment.punishment_year,
                    }
                    for punishment in person.punishments
                ],
            }
        )

    return result


@router.get("/{person_id}")
def get_person(
    person_id: str,
    lang: str = "te",
    db: Session = Depends(get_db),
):
    person = (
        db.query(Person)
        .options(
            joinedload(Person.area).joinedload(Area.district),
            joinedload(Person.punishments),
        )
        .filter(Person.person_id == person_id)
        .first()
    )

    if not person:
        raise HTTPException(
            status_code=404,
            detail="Person not found",
        )

    # Get translations for selected language
    translations = get_translations(
        db,
        person.person_id,
        lang,
    )

    # Original Telugu values are used as fallback
    name = translations.get(
        "name",
        person.name,
    )

    father_name = translations.get(
        "father_name",
        person.father_name,
    )

    village = translations.get(
        "village",
        person.village,
    )

    return {
        "person_id": person.person_id,
        "name": name,
        "father_name": father_name,
        "village": village,

        "area": {
            "area_id": person.area.area_id,
            "area_name": person.area.area_name,
        }
        if person.area else None,

        "district": {
            "district_id": person.area.district.district_id,
            "district_name": person.area.district.district_name,
        }
        if person.area and person.area.district else None,

        "punishments": [
            {
                "punishment_id": punishment.punishment_id,
                "punishment": punishment.punishment,
                "punishment_year": punishment.punishment_year,
            }
            for punishment in person.punishments
        ],
    }